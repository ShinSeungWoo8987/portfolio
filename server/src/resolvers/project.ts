import { ObjectId } from 'mongodb';
import { Resolver, Query, Mutation, InputType, Arg, ObjectType, Field, Int } from 'type-graphql';
import { getMongoRepository, ObjectID, ObjectIdColumn } from 'typeorm';
import { Project } from '../entity/Project';
import { ProjectImg } from '../entity/ProjectImg';
import { deleteImage } from '../functions/awsS3';
import { FieldError } from './FieldError';

@InputType()
class ProjectInput {
  @Field()
  title!: string;
  @Field()
  subtitle!: string;
  @Field()
  platform!: string;
  @Field()
  domain?: string;
  @Field()
  func!: string;
  @Field()
  github?: string;

  @Field()
  background_up_color!: string;
  @Field()
  background_down_color!: string;
  @Field()
  line_color!: string;
  @Field()
  font_color!: string;
}

@InputType()
class UpdateProjectInput extends ProjectInput {
  @Field()
  id?: string;
}

@InputType()
export class ProjectImgInput {
  @Field(() => Int)
  order!: number;

  @Field()
  url!: string;
}

@ObjectType()
class ProjectResponse {
  @Field(() => FieldError, { nullable: true })
  error?: FieldError;

  @Field(() => Project, { nullable: true })
  project?: Project;

  @Field(() => [Project], { nullable: true })
  projects?: Project[];
}

@Resolver()
export class ProjectResolver {
  @Query(() => ProjectResponse)
  async projects(): Promise<ProjectResponse> {
    try {
      return { projects: await Project.find() };
    } catch (error) {
      console.log(error);
      return { error: { field: 'projects', message: 'cannot read projects' } };
    }
  }

  @Mutation(() => ProjectResponse)
  async createProject(
    @Arg('project')
    {
      title,
      subtitle,
      platform,
      func,
      github,
      domain,
      background_up_color,
      background_down_color,
      line_color,
      font_color,
    }: ProjectInput,

    @Arg('front_end', () => [String]) front_end: string[],
    @Arg('back_end', () => [String]) back_end: string[],
    @Arg('cloud', () => [String]) cloud: string[],
    @Arg('database', () => [String]) database: string[],

    @Arg('project_img', () => [ProjectImgInput]) project_img: ProjectImgInput[]
  ): Promise<ProjectResponse> {
    try {
      const project = new Project();

      project.title = title;
      project.subtitle = subtitle;
      project.platform = platform;
      project.func = func;
      if (github) project.github = github;
      if (domain) project.domain = domain;

      project.background_up_color = background_up_color;
      project.background_down_color = background_down_color;
      project.line_color = line_color;
      project.font_color = font_color;

      project.front_end = front_end;
      project.back_end = back_end;
      project.cloud = cloud;
      project.database = database;

      project.project_img = [];
      project_img.forEach((i) => {
        project.project_img.push(new ProjectImg(i.order, i.url));
      });

      await Project.save(project);
      return { project };
    } catch (err) {
      return { error: { field: 'createProject', message: 'cannot create project' } };
    }
  }

  //
  @Mutation(() => ProjectResponse)
  async updateProject(
    @Arg('project')
    {
      id,
      title,
      subtitle,
      platform,
      func,
      github,
      domain,
      background_up_color,
      background_down_color,
      line_color,
      font_color,
    }: UpdateProjectInput,

    @Arg('front_end', () => [String]) front_end: string[],
    @Arg('back_end', () => [String]) back_end: string[],
    @Arg('cloud', () => [String]) cloud: string[],
    @Arg('database', () => [String]) database: string[],

    @Arg('project_img', () => [ProjectImgInput]) project_img: ProjectImgInput[]
  ): Promise<ProjectResponse> {
    try {
      const project = new Project();

      project.title = title;
      project.subtitle = subtitle;
      project.platform = platform;
      project.func = func;
      if (github) project.github = github;
      if (domain) project.domain = domain;

      project.background_up_color = background_up_color;
      project.background_down_color = background_down_color;
      project.line_color = line_color;
      project.font_color = font_color;

      project.front_end = front_end;
      project.back_end = back_end;
      project.cloud = cloud;
      project.database = database;

      project.project_img = [];
      project_img.forEach((i) => {
        project.project_img.push(new ProjectImg(i.order, i.url));
      });

      await Project.update({ id: new ObjectId(id) }, project);

      project.id = new ObjectId(id);
      return { project };
    } catch (err) {
      console.log(err);
      return { error: { field: 'updateProject', message: 'cannot update project' } };
    }
  }

  /////
  @Mutation(() => Boolean)
  async deleteProject(@Arg('id') id: string): Promise<Boolean> {
    try {
      const project = await Project.findOne({ where: { id: ObjectIdColumn(id) } });

      project?.project_img.forEach((img) => {
        const _temp = img.url.split('/');
        deleteImage(_temp[_temp.length - 1]);
      });

      await Project.delete({ id: new ObjectId(id) });

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
