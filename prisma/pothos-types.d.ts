/* eslint-disable */
import type { Prisma, Account, Session, User, VerificationToken, Perfil, Grupo, Cobro, Pago } from "@prisma/client";
export default interface PrismaTypes {
    Account: {
        Name: "Account";
        Shape: Account;
        Include: Prisma.AccountInclude;
        Select: Prisma.AccountSelect;
        OrderBy: Prisma.AccountOrderByWithRelationInput;
        WhereUnique: Prisma.AccountWhereUniqueInput;
        Where: Prisma.AccountWhereInput;
        Create: Prisma.AccountCreateInput;
        Update: Prisma.AccountUpdateInput;
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
            };
        };
    };
    Session: {
        Name: "Session";
        Shape: Session;
        Include: Prisma.SessionInclude;
        Select: Prisma.SessionSelect;
        OrderBy: Prisma.SessionOrderByWithRelationInput;
        WhereUnique: Prisma.SessionWhereUniqueInput;
        Where: Prisma.SessionWhereInput;
        Create: Prisma.SessionCreateInput;
        Update: Prisma.SessionUpdateInput;
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
            };
        };
    };
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: Prisma.UserCreateInput;
        Update: Prisma.UserUpdateInput;
        RelationName: "accounts" | "sessions";
        ListRelations: "accounts" | "sessions";
        Relations: {
            accounts: {
                Shape: Account[];
                Name: "Account";
            };
            sessions: {
                Shape: Session[];
                Name: "Session";
            };
        };
    };
    VerificationToken: {
        Name: "VerificationToken";
        Shape: VerificationToken;
        Include: never;
        Select: Prisma.VerificationTokenSelect;
        OrderBy: Prisma.VerificationTokenOrderByWithRelationInput;
        WhereUnique: Prisma.VerificationTokenWhereUniqueInput;
        Where: Prisma.VerificationTokenWhereInput;
        Create: Prisma.VerificationTokenCreateInput;
        Update: Prisma.VerificationTokenUpdateInput;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    Perfil: {
        Name: "Perfil";
        Shape: Perfil;
        Include: Prisma.PerfilInclude;
        Select: Prisma.PerfilSelect;
        OrderBy: Prisma.PerfilOrderByWithRelationInput;
        WhereUnique: Prisma.PerfilWhereUniqueInput;
        Where: Prisma.PerfilWhereInput;
        Create: Prisma.PerfilCreateInput;
        Update: Prisma.PerfilUpdateInput;
        RelationName: "Grupo" | "Cobro" | "Pago";
        ListRelations: "Grupo" | "Cobro" | "Pago";
        Relations: {
            Grupo: {
                Shape: Grupo[];
                Name: "Grupo";
            };
            Cobro: {
                Shape: Cobro[];
                Name: "Cobro";
            };
            Pago: {
                Shape: Pago[];
                Name: "Pago";
            };
        };
    };
    Grupo: {
        Name: "Grupo";
        Shape: Grupo;
        Include: Prisma.GrupoInclude;
        Select: Prisma.GrupoSelect;
        OrderBy: Prisma.GrupoOrderByWithRelationInput;
        WhereUnique: Prisma.GrupoWhereUniqueInput;
        Where: Prisma.GrupoWhereInput;
        Create: Prisma.GrupoCreateInput;
        Update: Prisma.GrupoUpdateInput;
        RelationName: "perfil" | "Pago";
        ListRelations: "Pago";
        Relations: {
            perfil: {
                Shape: Perfil;
                Name: "Perfil";
            };
            Pago: {
                Shape: Pago[];
                Name: "Pago";
            };
        };
    };
    Cobro: {
        Name: "Cobro";
        Shape: Cobro;
        Include: Prisma.CobroInclude;
        Select: Prisma.CobroSelect;
        OrderBy: Prisma.CobroOrderByWithRelationInput;
        WhereUnique: Prisma.CobroWhereUniqueInput;
        Where: Prisma.CobroWhereInput;
        Create: Prisma.CobroCreateInput;
        Update: Prisma.CobroUpdateInput;
        RelationName: "perfil" | "pagos";
        ListRelations: "pagos";
        Relations: {
            perfil: {
                Shape: Perfil;
                Name: "Perfil";
            };
            pagos: {
                Shape: Pago[];
                Name: "Pago";
            };
        };
    };
    Pago: {
        Name: "Pago";
        Shape: Pago;
        Include: Prisma.PagoInclude;
        Select: Prisma.PagoSelect;
        OrderBy: Prisma.PagoOrderByWithRelationInput;
        WhereUnique: Prisma.PagoWhereUniqueInput;
        Where: Prisma.PagoWhereInput;
        Create: Prisma.PagoCreateInput;
        Update: Prisma.PagoUpdateInput;
        RelationName: "grupo" | "perfil" | "cobro";
        ListRelations: never;
        Relations: {
            grupo: {
                Shape: Grupo;
                Name: "Grupo";
            };
            perfil: {
                Shape: Perfil;
                Name: "Perfil";
            };
            cobro: {
                Shape: Cobro;
                Name: "Cobro";
            };
        };
    };
}