import { OmitType } from "@nestjs/swagger";
import { Expose, plainToClass, Type } from "class-transformer";
import { FileDTO } from "../../file/dto/file.dto";
import { MyShareSecurityDTO } from "./myShareSecurity.dto";
import { ShareDTO } from "./share.dto";

export class AdminShareDTO extends OmitType(ShareDTO, [
  "files",
  "from",
  "fromList",
] as const) {
  @Expose()
  views: number;

  @Expose()
  downloads: number;

  @Expose()
  createdAt: Date;

  @Expose()
  security?: MyShareSecurityDTO;

  @Expose()
  recipients: string[];

  @Expose()
  @Type(() => OmitType(FileDTO, ["share", "from"] as const))
  files: Omit<FileDTO, "share" | "from">[];

  from(partial: Partial<AdminShareDTO>) {
    return plainToClass(AdminShareDTO, partial, {
      excludeExtraneousValues: true,
    });
  }

  fromList(partial: Partial<AdminShareDTO>[]) {
    return partial.map((part) =>
      plainToClass(AdminShareDTO, part, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
