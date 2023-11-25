import { UpdateFilter } from "mongodb";
import mongoose, { Aggregate, AggregateOptions, Document, FilterQuery, Model, PipelineStage, PopulateOptions, QueryOptions, UpdateQuery } from "mongoose";

export abstract class UserRepository<TDocument extends Document>{
    constructor(
        protected readonly entityModel: Model<TDocument>
    ) { };
    async create(
        entityQueryData: unknown
    ): Promise<TDocument> {
        const entity = new this.entityModel(entityQueryData);
        return entity.save();
    }
    async findOne(
        entityFilterQuery: FilterQuery<string | unknown>,
        projection?: Record<string, Document>
    ): Promise<TDocument | null> {
        return this.entityModel.findOne(
            entityFilterQuery,
            { _id: 0, __v: 0, ...projection }
        ).exec();
    }
    async findByIdAndUpdate(
        id: mongoose.ObjectId | string,
        update?: UpdateQuery<TDocument>,
        options?: QueryOptions<TDocument> | null
    ): Promise<TDocument | null> {
        return this.entityModel.findByIdAndUpdate(
            id,
            update,
            options
        ).exec();
    }
    async find(
        entityFilterQuery: FilterQuery<TDocument>,
        projection?: Record<string, Document>,
        options?: QueryOptions<TDocument> | null
    ): Promise<TDocument[] | null> {
        return this.entityModel.find(
            entityFilterQuery,
            { _id: 0, __v: 0, ...projection },
            options
        ).exec();
    }
    async findById(
        id: mongoose.ObjectId | string,
        projection?: Record<string, Document>,
        options?: QueryOptions<TDocument> | null
    ): Promise<TDocument | null> {
        return await this.entityModel.findById(
            id,
            { _id: 0, __v: 0, ...projection },
            options
        ).exec();
    }
    async findByIdAndRemove(
        id: mongoose.ObjectId | string,
        options?: QueryOptions<TDocument>
    ): Promise<TDocument | null> {
        return await this.entityModel.findByIdAndRemove(
            id,
            options
        ).exec();
    }
    async findOneAndUpdate(
        filterQuery: FilterQuery<TDocument>,
        updateQueryData: UpdateFilter<TDocument>
    ): Promise<TDocument | null> {
        return this.entityModel.findOneAndUpdate(
            filterQuery,
            updateQueryData
        ).exec();
    }
    async deleteMany(
        filterQuery: FilterQuery<TDocument>,
        options?: QueryOptions<TDocument>
    ): Promise<Boolean> {
        const deleteResult = await this.entityModel.deleteMany(filterQuery, options);
        return deleteResult.deletedCount >= 1
    }
    async deleteOne(
        filterQuery: FilterQuery<TDocument>
    ): Promise<Boolean> {
        const deleteResult = await this.entityModel.deleteOne(filterQuery);
        return deleteResult.deletedCount >= 1;
    }
    async populate(
        docs: Array<any>,
        options: PopulateOptions | Array<PopulateOptions>
    ): Promise<Array<TDocument>> {
        return this.entityModel.populate(docs, options);
    }
    aggregate<R = any>(
        pipeline: PipelineStage[],
        options?: AggregateOptions,
    ): Aggregate<Array<R>> {
        return this.entityModel.aggregate(pipeline, options)
    }
}