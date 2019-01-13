import {Builder, BuilderConfiguration, BuilderContext, BuildEvent} from '@angular-devkit/architect';
import {bindNodeCallback, Observable, of} from 'rxjs';
import {concatMap} from 'rxjs/operators';
import {TimestampBuilderSchema} from './schema';
import {getSystemPath} from '@angular-devkit/core';
import {writeFile} from 'fs';
import * as childProcess from 'child_process';
import * as util from "util";

export default class CommithashBuilder implements Builder<TimestampBuilderSchema> {
  constructor(private context: BuilderContext) {
  }

  run(builderConfig: BuilderConfiguration<Partial<TimestampBuilderSchema>>): Observable<BuildEvent> {
    const root = this.context.workspace.root;
    const {path} = builderConfig.options;
    const commitHashoutObservale = bindNodeCallback(childProcess.exec);
    return of(null)
      .pipe(concatMap(() => commitHashoutObservale('git rev-parse HEAD')),
        concatMap((res) => {
          this.context.logger.info("success command done: " + util.inspect(res[0]));
          const commitFileName = `${getSystemPath(root)}/${path}`;
          const writeCommitHashObservable = bindNodeCallback(writeFile);
          return writeCommitHashObservable(commitFileName, res[0]);
        }),
        concatMap(() => {
          return new Observable(obs => {
            this.context.logger.info("commithash file created");
            Promise.resolve().then(() => {
              obs.next({success: true});
              obs.complete();
            }, (err) => {
              obs.error(err);
            });
          });
        }));
  }

}
