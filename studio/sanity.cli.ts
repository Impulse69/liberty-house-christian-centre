import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'eoo28lss',
    dataset: 'production',
  },
  deployment: {
    autoUpdates: true,
  },
})
