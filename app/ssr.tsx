import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server'
import { getRouter } from '~/router'

const handler = createStartHandler(defaultStreamHandler)

export default handler(() => {
  const router = getRouter()
  return router
})
