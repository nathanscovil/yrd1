import {Builder, BuilderConfiguration, BuilderContext, BuildEvent} from '@angular-devkit/architect';
import {bindNodeCallback, Observable, of} from 'rxjs';
import {concatMap} from 'rxjs/operators';
import {VersionBuilderSchema} from './schema';
import {getSystemPath} from '@angular-devkit/core';
import {writeFile} from 'fs';
import * as util from "util";

export default class VersionBuilder implements Builder<VersionBuilderSchema> {
  constructor(private context: BuilderContext) {
  }

  run(builderConfig: BuilderConfiguration<Partial<VersionBuilderSchema>>): Observable<BuildEvent> {
    const root = this.context.workspace.root;
    const {path} = builderConfig.options;
    const pkgJson = require(`${getSystemPath(root)}/package.json`);
    const version = pkgJson.version;
    console.log(version);
    return of(null)
      .pipe(
        concatMap((res) => {
          const versionFileName = `${getSystemPath(root)}/${path}`;
          const writVersionObservable = bindNodeCallback(writeFile);
          return writVersionObservable(versionFileName, version);
        }),
        concatMap(() => {
          return new Observable(obs => {
            this.context.logger.info("version file created");
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
