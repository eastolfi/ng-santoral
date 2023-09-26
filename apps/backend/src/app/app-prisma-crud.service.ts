import { CrudMethodOpts, PrismaCrudService } from 'nestjs-prisma-crud';

export class AppPrismaCrudService<M> extends PrismaCrudService {
    public findOne(id: string | number, opts: CrudMethodOpts): Promise<M> {
        return super.findOne(parseInt(id as string), opts);
    }

    public update(id: string | number, updateDto: Partial<M>, opts: CrudMethodOpts): Promise<M> {
        return super.update(parseInt(id as string), updateDto, opts);
    }

    public remove(id: string | number, opts: CrudMethodOpts): Promise<null> {
        return super.remove(parseInt(id as string), opts);
    }
}
