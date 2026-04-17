'use client'

import dynamic from 'next/dynamic'

const SyncedBackgroundAnimation = dynamic(
  () => import('./SyncedBackgroundAnimation').then(m => m.SyncedBackgroundAnimation),
  { ssr: false }
)

export default function BackgroundAnimationWrapper() {
  return <SyncedBackgroundAnimation />
}
