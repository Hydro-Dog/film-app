import { Controller } from '@nestjs/common'
import { MatchSessionService } from './match-session.service'

@Controller()
export class MatchSessionController {
  constructor(private matchSessionService: MatchSessionService) {}
}
