import { dbInit } from '@/util/dbInit';
import { AccountDummyBuilder } from '@/domain/account/dev/AccountDummyBuilder';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountModule } from '@/domain/account/AccountModule';
import { AuthModule } from '@/auth/AuthModule';
import { FileDummyBuilder } from '@/domain/file/file/dev/FileDummyBuilder';
import { RoleDummyBuilder } from '@/domain/permission/role/dev/RoleDummyBuilder';
import { AccountRoleDummyBuilder } from '@/domain/permission/accountrole/dev/AccountRoleDummyBuilder';
import { FilePolicyDummyBuilder } from '@/domain/permission/filepolicy/dev/FilePolicyDummyBuilder';
import { FileAuthorityDummyBuilder } from '@/domain/permission/fileauthority/dev/FileAuthorityDummyBuilder';
import { FileModule } from '@/domain/file/file/FileModule';
import { RoleModule } from '@/domain/permission/role/RoleModule';
import { AccountRoleModule } from '@/domain/permission/accountrole/AccountRoleModule';
import { FilePolicyModule } from '@/domain/permission/filepolicy/FilePolicyModule';
import { FileAuthorityModule } from '@/domain/permission/fileauthority/FileAuthorityModule';
import { PermissionVerifier } from '@/domain/permission/verifier/PermissionVerifier';
import { PermissionVerifierModule } from '@/domain/permission/verifier/PermissionVerifierModule';
import { accountTypeValues } from '@/domain/account/persistence/accountType';
import { permissionTypeValues } from '@/domain/permission/common/types';

describe('PermissionVerifier', () => {
  let ac: AccountDummyBuilder;
  let fi: FileDummyBuilder;
  let pl: RoleDummyBuilder;
  let ro: AccountRoleDummyBuilder;
  let fp: FilePolicyDummyBuilder;
  let fa: FileAuthorityDummyBuilder;
  let pv: PermissionVerifier;

  beforeEach(async () => {
    dbInit();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AccountModule,
        AuthModule,
        FileModule,
        RoleModule,
        AccountRoleModule,
        FilePolicyModule,
        FileAuthorityModule,
        PermissionVerifierModule,
      ],
    }).compile();

    ac = module.get(AccountDummyBuilder);
    fi = module.get(FileDummyBuilder);
    pl = module.get(RoleDummyBuilder);
    ro = module.get(AccountRoleDummyBuilder);
    fp = module.get(FilePolicyDummyBuilder);
    fa = module.get(FileAuthorityDummyBuilder);
    pv = module.get(PermissionVerifier);
  });

  it('test', async () => {
    const ac1 = await ac.ac(1, accountTypeValues.MEMBER);
    const fi1 = await fi.fi(
      1,
      permissionTypeValues.FORBIDDEN,
      permissionTypeValues.FORBIDDEN,
    );

    const pl1 = await pl.pl(1);
    const pl2 = await pl.pl(2);
    const pl3 = await pl.pl(3);

    await ro.ro(ac1.id, pl1.id);
    await ro.ro(ac1.id, pl2.id);

    const ret1 = await pv.verify(ac.sc(ac1), fi1);
    await fp.fp(fi1.id, pl3.id, permissionTypeValues.KNOWN);
    expect(ret1).toBe(permissionTypeValues.FORBIDDEN);

    await fp.fp(fi1.id, pl1.id, permissionTypeValues.KNOWN);
    await fp.fp(fi1.id, pl2.id, permissionTypeValues.READ);
    const ret2 = await pv.verify(ac.sc(ac1), fi1);
    expect(ret2).toBe(permissionTypeValues.READ);

    await fa.fa(fi1.id, ac1.id, permissionTypeValues.WRITE);
    const ret3 = await pv.verify(ac.sc(ac1), fi1);
    expect(ret3).toBe(permissionTypeValues.WRITE);
  });
});
