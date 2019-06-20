export default {
  showCube: false,
  dimension: '2D',
  velocity: 2,
  boundaryType: 'passthru',
  antialias: true,
  direction: {
    xMin: -1,
    xMax: 1,
    yMin: -1,
    yMax: 1,
    zMin: -1,
    zMax: 1
  },
  lines: {
    colorMode: 'solid',
    color: '#4e8bc3',
    transparency: 0.9,
    limitConnections: true,
    maxConnections: 20,
    minDistance: 110,
    visible: true
  },
  particles: {
    colorMode: 'solid',
    color: '#ccc',
    transparency: 0.9,
    shape: 'circle',
    boundingBox: 'canvas',
    count: 300,
    minSize: 20,
    maxSize: 50,
    visible: true
  },
  cameraControls: {
    enabled: false,
    enableDamping: true,
    dampingFactor: 0,
    enableZoom: false,
    autoRotate: false,
    autoRotateSpeed: 0.7,
    resetCameraFlag: true
  }
}