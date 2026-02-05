import Docker from 'dockerode'
import { logger } from '../utils/helpers/logger'

let docker: Docker | null = null

export function getDockerClient(): Docker | null {
  return docker
}

export async function setupDockerClient(): Promise<void> {
  try {
    // Skip Docker setup in production environments like Render
    if (process.env.NODE_ENV === 'production' && process.env.RENDER) {
      logger.warn('⚠️  Docker setup skipped in Render production environment')
      return
    }

    // Check if Docker socket is available
    const fs = require('fs')
    const dockerSocketPath = '/var/run/docker.sock'
    
    if (!fs.existsSync(dockerSocketPath)) {
      logger.warn('⚠️  Docker socket not found, skipping Docker client setup')
      return
    }

    docker = new Docker()
    await docker.ping()
    logger.info('✅ Docker client configured successfully')
  } catch (error) {
    logger.warn('⚠️  Docker client setup failed, continuing without Docker:', error)
    docker = null
    // Don't throw error in production, just log warning
    if (process.env.NODE_ENV !== 'production') {
      throw error
    }
  }
}

export async function cleanupDockerResources(): Promise<void> {
  if (!docker) {
    logger.info('No Docker client available, skipping cleanup')
    return
  }

  try {
    // Clean up stopped containers
    const containers = await docker.listContainers({ all: true })
    for (const container of containers) {
      if (container.State === 'exited' || container.State === 'dead') {
        await docker.getContainer(container.Id).remove()
      }
    }

    // Clean up unused images
    await docker.pruneImages()
    
    logger.info('✅ Docker resources cleaned up successfully')
  } catch (error) {
    logger.error('❌ Docker cleanup failed:', error)
  }
}
