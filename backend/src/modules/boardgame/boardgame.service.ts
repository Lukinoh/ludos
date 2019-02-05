import { Boardgame } from './model/boardgame.object';
import { BoardgameRepository } from './../../infrastructure/repositories/boardgame.repository';
import { Injectable } from '@nestjs/common';
import { BoardgameInput } from './dto/boardgame.input';

@Injectable()
export class BoardgameService {
  constructor(private boardgameRepository: BoardgameRepository) {
  }

  async save(boardgameInput: BoardgameInput): Promise<Boardgame> {
    let boardgameEntity = this.boardgameRepository.convertInputToEntity(boardgameInput);
    boardgameEntity = await this.boardgameRepository.save(boardgameEntity);
    return this.boardgameRepository.convertEntityToObject(boardgameEntity);
  }

  async get(id: number): Promise<Boardgame> {
    let boardgameEntity = await this.boardgameRepository.findOne(id);
    return this.boardgameRepository.convertEntityToObject(boardgameEntity);
  }

  async getAll(): Promise<Boardgame[]> {
    let boardgameEntities = await this.boardgameRepository.find();
    let boargames = boardgameEntities.map((boardgameEntity) => this.boardgameRepository.convertEntityToObject(boardgameEntity));
    return boargames;
  }
}