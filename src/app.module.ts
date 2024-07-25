import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      //specifies the driver used for graphql
      driver: ApolloDriver,
      //auto generate the graphql schema file and save to that link
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      //sorts schema lexicographically
      sortSchema: true,
      //enables i graphql playground = in browser for graphql --> for testing and debugging graphql api
      playground: true,
      //provides request and response objects in the graphql context. related to how graphql resolvers function.
      context: ({ req, res }) => ({ req, res }),
    }),
    //initialises the configuration module with default settings. used for managing env variables and application configuration
    ConfigModule.forRoot({}),
  ],
  //register app controller with the module. responsible for handling incoming requests and returning responses to the cient
  controllers: [AppController],
  //registers app service with the module. responsible for business logic and data management of the application
  providers: [AppService],
})
export class AppModule {}

//app module is the root module that sets up main configuration for nestjs application
//apollo server is a open source graphql server that helps to build a graphql api over various data sources. 
