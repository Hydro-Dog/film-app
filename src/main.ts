import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SocketAdapter } from './socket.adapter'

const port = process.env.PORT || 8080

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.enableCors({ origin: '*', allowedHeaders: '*' })
  app.useWebSocketAdapter(new SocketAdapter(app))

  await app.listen(port)
}
bootstrap()
