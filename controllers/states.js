// backend/controllers/contractController.js
const Contract = require('../models/contract');

exports.getBarChartData = async (req, res) => {
  try {
    const data = await Contract.aggregate([
      {
        $group: {
          _id: '$Nom_du_partenaire',
          primeoCount: {
            $sum: {
              $cond: [{ $eq: ['$Fournisseur', 'primeo'] }, 1, 0],
            },
          },
          ohmCount: {
            $sum: {
              $cond: [{ $eq: ['$Fournisseur', 'ohm'] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          partenaire: '$_id',
          primeo: '$primeoCount',
          ohm: '$ohmCount',
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// backend/controllers/contractController.js

exports.getPieChartData = async (req, res) => {
  try {
    const data = await Contract.aggregate([
      {
        $group: {
          _id: '$Fournisseur',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          label: '$_id',
          value: '$count',
          // You can also define custom colors here
          color: {
            $cond: {
              if: { $eq: ['$_id', 'primeo'] },
              then: 'hsl(148, 70%, 50%)',
              else: 'hsl(68, 70%, 50%)',
            },
          },
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
