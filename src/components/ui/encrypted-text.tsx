'use client'

import { useEffect, useRef, useState, type ComponentProps } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

import { cn } from '@/lib/utils'

export const ENCRYPTED_TEXT_DEFAULT_CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?'

export interface EncryptedTextProps extends Omit<
  ComponentProps<'span'>,
  'children'
> {
  text: string
  revealDelayMs?: number
  flipDelayMs?: number
  charset?: string
  encryptedClassName?: string
  revealedClassName?: string
}

const isWhitespace = (character: string) => /\s/.test(character)

function getInitialCharacter(
  character: string,
  index: number,
  charset: string
) {
  if (isWhitespace(character)) return character

  const seed = character.charCodeAt(0) * 31 + index * 17
  return charset[seed % charset.length]
}

function getRandomCharacter(charset: string) {
  return charset[Math.floor(Math.random() * charset.length)]
}

function getInitialScramble(text: string, charset: string) {
  return Array.from(text, (character, index) =>
    getInitialCharacter(character, index, charset)
  )
}

export function EncryptedText({
  text,
  revealDelayMs = 50,
  flipDelayMs = 50,
  charset = ENCRYPTED_TEXT_DEFAULT_CHARSET,
  encryptedClassName,
  revealedClassName,
  className,
  ...props
}: EncryptedTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(rootRef, { once: true, amount: 0.3 })
  const shouldReduceMotion = useReducedMotion()
  const safeCharset = charset || ENCRYPTED_TEXT_DEFAULT_CHARSET
  const [revealedCount, setRevealedCount] = useState(0)
  const [characters, setCharacters] = useState(() =>
    getInitialScramble(text, safeCharset)
  )

  useEffect(() => {
    const initialCharacters = getInitialScramble(text, safeCharset)
    setCharacters(initialCharacters)
    setRevealedCount(0)

    if (!isInView) return

    if (shouldReduceMotion) {
      setCharacters(Array.from(text))
      setRevealedCount(text.length)
      return
    }

    const revealInterval = Math.max(1, revealDelayMs)
    const flipInterval = Math.max(1, flipDelayMs)
    const startedAt = performance.now()
    let lastFlipAt = startedAt
    let previousRevealCount = 0
    let animationFrame = 0

    const update = (now: number) => {
      const nextRevealCount = Math.min(
        text.length,
        Math.floor((now - startedAt) / revealInterval)
      )
      const shouldFlip = now - lastFlipAt >= flipInterval

      if (nextRevealCount !== previousRevealCount || shouldFlip) {
        setCharacters((currentCharacters) =>
          Array.from(text, (character, index) => {
            if (index < nextRevealCount || isWhitespace(character)) {
              return character
            }

            return shouldFlip
              ? getRandomCharacter(safeCharset)
              : (currentCharacters[index] ??
                  getInitialCharacter(character, index, safeCharset))
          })
        )
        setRevealedCount(nextRevealCount)
        previousRevealCount = nextRevealCount
      }

      if (shouldFlip) lastFlipAt = now
      if (nextRevealCount < text.length) {
        animationFrame = requestAnimationFrame(update)
      }
    }

    animationFrame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(animationFrame)
  }, [
    flipDelayMs,
    isInView,
    revealDelayMs,
    safeCharset,
    shouldReduceMotion,
    text,
  ])

  if (!text) return null

  // Tách thành từ và khoảng trắng, giữ nguyên index để khớp với `characters`
  const tokens = text.split(/(\s+)/).filter(Boolean)
  let offset = 0

  return (
    <span
      ref={rootRef}
      className={cn(
        'relative inline whitespace-pre-wrap align-baseline',
        className
      )}
      {...props}
    >
      <span className="sr-only">{text}</span>

      {tokens.map((token, tokenIndex) => {
        const start = offset
        offset += token.length

        // Khoảng trắng / xuống dòng: render thẳng để trình duyệt tự wrap
        if (isWhitespace(token[0])) {
          return (
            <span key={tokenIndex} aria-hidden="true">
              {token}
            </span>
          )
        }

        return (
          <span
            key={tokenIndex}
            aria-hidden="true"
            className="relative inline-block whitespace-nowrap"
          >
            <span className="invisible">{token}</span>
            <span className="absolute inset-0 text-left">
              {characters
                .slice(start, start + token.length)
                .map((character, i) => {
                  const isRevealed = start + i < revealedCount
                  return (
                    <span
                      key={start + i}
                      data-encrypted-character
                      data-revealed={isRevealed}
                      className={cn(
                        isRevealed ? revealedClassName : encryptedClassName
                      )}
                    >
                      {character}
                    </span>
                  )
                })}
            </span>
          </span>
        )
      })}
    </span>
  )
}
