const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const contractSchema = mongoose.Schema(
  {
    contratRef: {
      type: String,
      trim: true,
      maxlenght: 32,
      text: true,
    },
    slug: {
      slug: { type: String, slug: ['clientRef', 'energie'] ,separator: '/',
    }
      

    },
    clientRef: {
      type: String,
      trim: true,
      maxlenght: 32,
      text: true,
    },
    Civility: {
      type: String,
      trim: true,
      maxlenght: 8,
      text: true,
    },
    Prénom: {
      type: String,
      trim: true,
      maxlenght: 32,
      text: true,
    },

    Nom: {
      type: String,
      trim: true,
      maxlenght: 32,
      text: true,
    },
    tel: {
      type: String,
      index: true,
    },
    email: {
      type: String,
      trim: true,
      maxlenght: 32,
      text: true,
    },
    Adresse: {
      type: String,
      maxlenght: 100,
    },
    Code_postal: {
      type: Number,
    },
    Commune: {
      type: String,
      maxlenght: 50,
      text: true,
    },
    energie: {
      type: String,
    },
    Point_de_livraison: {
      type: String,
    },
    Puissance: {
      type: String,
    },
    Offre: {
      type: String,
    },
    Statut: {
      type: String,
    },
    Nom_du_partenaire: {
      type: String,
    },
    date_de_début: {
      type: Date,
    },
    date_de_la_signature: {
      type: Date,
    },

    Mensualité: {
      type: String,
    },

    Fournisseur: {
        type: String,
      },

    reservedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
      },
  
      reservedAt: {
        type: Date,
        default: null
      },
    quality: {
      values: {
        Appel_enregistré: {
          type: Boolean,
          default: false,
        },
        _14j_de_rétractation: {
          type: Boolean,
          default: false,
        },
        Autorisation_accès_GRD: {
          type: Boolean,
          default: false,
        },
        Inscription_Bloctel: {
          type: Boolean,
          default: false,
        },
        Valider_les_coordonnées_du_client: {
          type: Boolean,
          default: false,
        },
        Expliquer_que_nous_sommes_KOMPAR: {
          type: Boolean,
          default: false,
        },
        Explication_changement_de_fournisseur: {
          type: Boolean,
          default: false,
        },
        Discours_frauduleux_mensenger: {
          type: Boolean,
          default: false,
        },
        MES_non_conforme: {
          type: Boolean,
          default: false,
        },
        non_conformité_signature_recap: {
          type: Boolean,
          default: false,
        },
        Validation_à_la_place_du_prospect: {
          type: Boolean,
          default: false,
        },
        Comportement_général: {
          type: Boolean,
          default: false,
        },
        Mineur_trop_âgée_non_lucide: {
          type: Boolean,
          default: false,
        },
        IBAN_invalide: {
          type: Boolean,
          default: false,
        },
      },
      qualification: {
        type: String,
        enum: ['conforme', 'non-conforme', 'sav', 'annulation', 'aucun(e)'],
        default: 'aucun(e)',
      },
      comment: { type: String, default: '' },
    },
    sav: {
      qualification: {
        type: String,
        enum: ['validé', 'A_relancer', 'annulation', 'aucun(e)'],
        default: 'aucun(e)',
      },
      comment: { type: String, default: '' },
    },

    wc: {
      qualification: {
        type: String,
        enum: [
          'validé',
          'A_suivre',
          'annulation',
          'aucun(e)',
          'sav',
          'faux_numéro',
        ],
        default: 'aucun(e)',

      },
      subQualification: {
        type: String,
        enum: [
          ' Iban_frauduleux',
          ' STOP_Télémarketing',
          'Hors_cible',
          'forcing',
          'Déménagement',
          'Contrat_en_double',
        ],
      },
      comment: { type: String, default: '' },
      
    },
   
  },

  
  { timestamps: true }
);
module.exports = mongoose.model('Contract', contractSchema);