import { useEffect, useState } from 'react'
import logo from '../assets/farbs logo.png'
import './SplashScreen.css'

type Props = {
  onFinish: () => void
  duration?: number
}

export default function SplashScreen({ onFinish, duration = 4500 }: Props) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onFinish, 600)
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onFinish])

  if (!visible) return null

  return (
    <div className={`splash-root ${!visible ? 'splash-fade-out' : ''}`}>
      <div className="noise" />
      <div className="grid-bg" />
      <div className="scan-line" />

      <div className="corner tl" />
      <div className="corner tr" />
      <div className="corner bl" />
      <div className="corner br" />

      <div className="center-content">
        <div className="logo-wrap">
          <img className="logo-pulse" src={logo} alt="FARBS logo" />
        </div>

        <div className="title-block">
          <div className="farbs-label">F · A · R · B · S</div>
          <div className="main-title">BattleScout</div>
          <div className="subtitle">Tactical reconnaissance system · ALPHA VERSION</div>
        </div>

        <div className="tagline">FULL AUTO REACTION BATTLE SYSTEM — ONLINE</div>

        <div className="loading-bar-wrap">
          <div className="loading-bar" />
        </div>

        <div className="status-bar">
          <div className="status-item">
            <div className="status-dot green" />
            <span className="status-label">GPS</span>
          </div>
          <div className="status-item">
            <div className="status-dot green" />
            <span className="status-label">Tiles</span>
          </div>
          <div className="status-item">
            <div className="status-dot amber" />
            <span className="status-label">Comms</span>
          </div>
          <div className="status-item">
            <div className="status-dot" />
            <span className="status-label">Auth</span>
          </div>
        </div>
      </div>
    </div>
  )
}
