/* eslint-disable */
import type { Prisma, Account, Session, User, VerificationToken, Perfil, Cuenta, Grupo, Participante, Cobro, Pago, CuentaFavorita } from "@prisma/client";
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
        RelationName: "cuentasFavoritas" | "cuentas" | "participante";
        ListRelations: "cuentasFavoritas" | "cuentas" | "participante";
        Relations: {
            cuentasFavoritas: {
                Shape: CuentaFavorita[];
                Name: "CuentaFavorita";
            };
            cuentas: {
                Shape: Cuenta[];
                Name: "Cuenta";
            };
            participante: {
                Shape: Participante[];
                Name: "Participante";
            };
        };
    };
    Cuenta: {
        Name: "Cuenta";
        Shape: Cuenta;
        Include: Prisma.CuentaInclude;
        Select: Prisma.CuentaSelect;
        OrderBy: Prisma.CuentaOrderByWithRelationInput;
        WhereUnique: Prisma.CuentaWhereUniqueInput;
        Where: Prisma.CuentaWhereInput;
        Create: Prisma.CuentaCreateInput;
        Update: Prisma.CuentaUpdateInput;
        RelationName: "perfil" | "cobros" | "grupo" | "cuentasFavoritas";
        ListRelations: "cobros" | "grupo" | "cuentasFavoritas";
        Relations: {
            perfil: {
                Shape: Perfil;
                Name: "Perfil";
            };
            cobros: {
                Shape: Cobro[];
                Name: "Cobro";
            };
            grupo: {
                Shape: Grupo[];
                Name: "Grupo";
            };
            cuentasFavoritas: {
                Shape: CuentaFavorita[];
                Name: "CuentaFavorita";
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
        RelationName: "cuenta" | "Participante";
        ListRelations: "Participante";
        Relations: {
            cuenta: {
                Shape: Cuenta;
                Name: "Cuenta";
            };
            Participante: {
                Shape: Participante[];
                Name: "Participante";
            };
        };
    };
    Participante: {
        Name: "Participante";
        Shape: Participante;
        Include: Prisma.ParticipanteInclude;
        Select: Prisma.ParticipanteSelect;
        OrderBy: Prisma.ParticipanteOrderByWithRelationInput;
        WhereUnique: Prisma.ParticipanteWhereUniqueInput;
        Where: Prisma.ParticipanteWhereInput;
        Create: Prisma.ParticipanteCreateInput;
        Update: Prisma.ParticipanteUpdateInput;
        RelationName: "perfil" | "grupo" | "pagos";
        ListRelations: "pagos";
        Relations: {
            perfil: {
                Shape: Perfil;
                Name: "Perfil";
            };
            grupo: {
                Shape: Grupo;
                Name: "Grupo";
            };
            pagos: {
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
        RelationName: "cuenta" | "pagos";
        ListRelations: "pagos";
        Relations: {
            cuenta: {
                Shape: Cuenta;
                Name: "Cuenta";
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
        RelationName: "cobro" | "participante";
        ListRelations: never;
        Relations: {
            cobro: {
                Shape: Cobro;
                Name: "Cobro";
            };
            participante: {
                Shape: Participante;
                Name: "Participante";
            };
        };
    };
    CuentaFavorita: {
        Name: "CuentaFavorita";
        Shape: CuentaFavorita;
        Include: Prisma.CuentaFavoritaInclude;
        Select: Prisma.CuentaFavoritaSelect;
        OrderBy: Prisma.CuentaFavoritaOrderByWithRelationInput;
        WhereUnique: Prisma.CuentaFavoritaWhereUniqueInput;
        Where: Prisma.CuentaFavoritaWhereInput;
        Create: Prisma.CuentaFavoritaCreateInput;
        Update: Prisma.CuentaFavoritaUpdateInput;
        RelationName: "perfil" | "cuenta";
        ListRelations: never;
        Relations: {
            perfil: {
                Shape: Perfil;
                Name: "Perfil";
            };
            cuenta: {
                Shape: Cuenta;
                Name: "Cuenta";
            };
        };
    };
}