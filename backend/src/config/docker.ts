import Docker from 'dockerode'

export const docker = new Docker()

export async function setupDockerClient(): Promise<void> {
  try {
    await docker.ping()
    console.log('✅ Docker client configured successfully')
  } catch (error) {
    console.error('❌ Docker client setup failed:', error)
    throw error
  }
}

export async function cleanupDockerResources(): Promise<void> {
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
    
    console.log('✅ Docker resources cleaned up successfully')
  } catch (error) {
    console.error('❌ Docker cleanup failed:', error)
    throw error
  }
}
