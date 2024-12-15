import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SectionService {
  constructor(private readonly databaseService: DatabaseService) { }

  create(createSectionDto: CreateSectionDto) {
    return 'This action adds a new section';
  }

  async findAll() {
    try {
      const sections = await this.databaseService.section.findMany();
      return sections;
    } catch (error) {
      console.log(error.message);
    }
  }

  findOne(id: number) {
    if (!id) throw new Error('No id provided');
    try {
      const section = this.databaseService.section.findUnique({
        where: {
          id: id,
        },
      });
      if (!section) throw new Error('Section not found');
      return section;
    } catch(error) {
      console.error(error.message);
    };
  }

  update(id: number, updateSectionDto: UpdateSectionDto) {
    if (!id) throw new Error('No id provided');
    try {
      const section = this.databaseService.section.findUnique({
        where: {
          id: id,
        },
      });
      if (!section) throw new Error('Section not found');
      const updatedSection = this.databaseService.section.update({
        where: {
          id: id,
        },
        data: {
          name: updateSectionDto
        }
      });
      if (!updatedSection) throw new Error('Error updating section');
      return updatedSection;
    } catch(error) {
      console.error(error.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} section`;
  }
}
