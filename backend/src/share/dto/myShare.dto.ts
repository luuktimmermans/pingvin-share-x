import { OmitType } from "@nestjs/swagger";
import { Expose, plainToClass, Type } from "class-transformer";
import { FileDTO } from "../../file/dto/file.dto";
import { MyShareSecurityDTO } from "./myShareSecurity.dto";
import { ShareDTO } from "./share.dto";

export class MyShareDTO extends OmitType(ShareDTO, [
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
  recipients: string[];

  @Expose()
  @Type(() => OmitType(FileDTO, ["share", "from"] as const))
  files: Omit<FileDTO, "share" | "from">[];

  @Expose()
  security?: MyShareSecurityDTO;

  from(partial: Partial<MyShareDTO>) {
    return plainToClass(MyShareDTO, partial, { excludeExtraneousValues: true });
  }

  fromList(partial: Partial<MyShareDTO>[]) {
    return partial.map((part) =>
      plainToClass(MyShareDTO, part, { excludeExtraneousValues: true }),
    );
  }
}
