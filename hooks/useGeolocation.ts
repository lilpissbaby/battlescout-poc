import { useEffect, useState } from 'react'

export function useGeolocation() {
  const [position, setPosition] = useState<[number, number] | null>(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition([pos.coords.latitude, pos.coords.longitude])
    })
  }, [])

  return position
}