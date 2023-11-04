import {Injectable} from "@nestjs/common";
import {FilePolicyService} from "@/domain/permission/filepolicy/domain/FilePolicyService";
import {FilePolicyCreation} from "@/domain/permission/filepolicy/persistence/types";
import {PermissionType, permissionTypeValues} from "@/domain/permission/common/types";

@Injectable()
export class FilePolicyDummyBuilder {
  constructor(private readonly filePolicyService: FilePolicyService) {}

  fp(
    fileId: number,
    policyId: number,
    permission: PermissionType = permissionTypeValues.WRITE,
  ) {
    const creation: FilePolicyCreation = {
      file: { connect: { id: fileId } },
      policy: { connect: { id: policyId } },
      permission,
    };
    return this.filePolicyService.create(creation);
  }
}
