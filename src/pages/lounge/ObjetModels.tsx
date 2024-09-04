import { Text } from '@react-three/drei'
import { lazy } from 'react'
import * as THREE from 'three'
import { useRef, useMemo, useEffect } from 'react'
import type { RandomModelsProps } from '../../types/ModelType'

const ObjetModel1 = lazy(() => import('../../assets/models/ObjetModel1'))
const ObjetModel2 = lazy(() => import('../../assets/models/ObjetModel2'))
const ObjetModel3 = lazy(() => import('../../assets/models/ObjetModel3'))

export default function ObjetModels({
  objets,
  onModelClick,
}: RandomModelsProps) {
  const groupRef = useRef<THREE.Group>(null)

  const models = useMemo(() => {
    if (!objets || objets.length === 0) return []

    const availableModels = [ObjetModel1, ObjetModel2, ObjetModel3]
    const getRandomPosition = (length: number): [number, number, number] => {
      const ranges = [
        { range: 15, offset: -1 },
        { range: 30, offset: -5 },
        { range: 50, offset: -10 },
        { range: 75, offset: -15 },
        { range: 100, offset: -20 },
      ]
      const { range, offset } =
        ranges[Math.min(Math.floor(length / 5), ranges.length - 1)]
      return [
        Math.random() * range + offset,
        Math.random() * range + offset,
        Math.random() * range + offset,
      ]
    }

    return objets.map((objet) => {
      const mesh = new THREE.Group()

      const scaleMap: { [key: string]: number } = {
        O0001: 2,
        O0002: 2,
        O0003: 2,
      }

      mesh.scale.setScalar(scaleMap[objet.type] || 1)

      mesh.position.set(...getRandomPosition(objets.length))
      const ModelComponent =
        availableModels[
          objet.type === 'O0001' ? 0 : objet.type === 'O0002' ? 1 : 2
        ]

      mesh.position.set(...getRandomPosition(objets.length))
      mesh.userData = {
        id: objet.objet_id,
        lid: objet.lounge_id,
        onClick: () => onModelClick(mesh),
      }

      const nameText = (
        <Text
          position={[0, -1, 0]}
          fontSize={0.5}
          fontWeight={600}
          color='#FFFFFF'
        >
          {objet.name}
        </Text>
      )

      return { ModelComponent, mesh, nameText }
    })
  }, [objets, onModelClick])

  useEffect(() => {
    const group = groupRef.current
    if (group) {
      models.forEach(({ mesh }) => group.add(mesh))
    }
  }, [models])

  return (
    <group ref={groupRef}>
      {models.map(({ ModelComponent, mesh, nameText }, index) => (
        <mesh
          key={index}
          position={mesh.position}
          scale={mesh.scale}
          onClick={mesh.userData.onClick}
        >
          <ModelComponent />
          {nameText}
        </mesh>
      ))}
    </group>
  )
}
