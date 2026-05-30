import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'eoo28lss',
    dataset: 'production',
  },
  studioHost: 'liberty-house-christian-centre',
  deployment: {
    autoUpdates: true,
  },
})
