import { Injectable } from '@nestjs/common';
import { FileService } from '@/domain/file/file/domain/FileService';
import { File, FileCreation } from '@/domain/file/file/persistence/types';
import {
  PermissionType,
  permissionTypes,
} from '@/domain/permission/common/types';

@Injectable()
export class FileDummyBuilder {
  constructor(private readonly fileService: FileService) {}

  fi(
    n: number,
    memberDefaultPerm: PermissionType = permissionTypes.WRITE,
    guestDefaultPerm: PermissionType = permissionTypes.WRITE,
  ): Promise<File> {
    return this.fileService.create(
      this.fiC(n, memberDefaultPerm, guestDefaultPerm),
    ) as any;
  }

  fiC(
    n: number,
    memberDefaultPerm: PermissionType,
    guestDefaultPerm: PermissionType,
  ): FileCreation {
    return {
      path: `file${n}`,
      memberDefaultPerm,
      guestDefaultPerm,
    };
  }
}
