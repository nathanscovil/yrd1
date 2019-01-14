import {Builder, BuilderConfiguration, BuilderContext, BuildEvent} from '@angular-devkit/architect';
import {bindNodeCallback, Observable, of} from 'rxjs';
import {concatMap} from 'rxjs/operators';
import {CommitBuilderSchema} from './schema';
import {getSystemPath} from '@angular-devkit/core';
import {writeFile} from 'fs';
import * as childProcess from 'child_process';
import * as util from "util";

export default class CommitBuilder implements Builder<CommitBuilderSchema> {
  constructor(private context: BuilderContext) {
  }

  run(builderConfig: BuilderConfiguration<Partial<CommitBuilderSchema>>): Observable<BuildEvent> {
    const root = this.context.workspace.root;
    const {path} = builderConfig.options;
    const CommitoutObservale = bindNodeCallback(childProcess.exec);
    return of(null)
      .pipe(concatMap(() => CommitoutObservale(`git rev-parse --short HEAD`)),
        concatMap((res) => {
          this.context.logger.info(`success command done: ` + util.inspect(res[0]));
          const commitFileName = `${getSystemPath(root)}/${path}`;
          const writeCommitObservable = bindNodeCallback(writeFile);
          return writeCommitObservable(commitFileName, res[0]);
        }),
        concatMap(() => {
          return new Observable(obs => {
            this.context.logger.info(`commit file created`);
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
