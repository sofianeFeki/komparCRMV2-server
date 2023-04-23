const Contract = require('../models/contract');


exports.create = async (req, res) => {
  try {
    // console.log(req.body);
    //req.body.slug = slugify(slug);

    const newContract = await Contract.insertMany(req.body);
    //console.log(res);
    res.json(newContract);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.read = async (req, res) => {
  try {
    const { clientRef, energie } = req.params;
    const contract = await Contract.findOne({ clientRef, energie }).exec();
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }

    let otherEnergie;
    if (energie === "Gaz") {
      otherEnergie = "électricité";
    } else if (energie === "électricité") {
      otherEnergie = "Gaz";
    }

    const otherContract = await Contract.findOne({ clientRef, energie: otherEnergie }).exec();
    const otherContractLink = otherContract ? `/contract-details/${clientRef}/${otherEnergie}` : "";

    res.json({ contract, otherContractLink });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};




  exports.adminRows = async (req, res) => {
    const { page, pageSize } = req.body.paginationModel;
    const { sortModel } = req.body.sortOptions;
    console.log(sortModel)
  
    try {
      const query = {};
      const projection = {
        contratRef: 1,
        Énergie: 1,
        Fournisseur: 1,
        date_de_la_signature: 1,
        StatutQté: '$quality.qualification',
        StatutSav: '$sav.qualification',
        Nom_du_partenaire: 1,
        _id: 0,
      };
  
      let contracts;
  
      if (sortModel && sortModel.length > 0) {
        contracts = await Contract.find(query, projection)
          .sort(sortModel.map(({ field, sort }) => [field, sort === 'asc' ? 1 : -1]))
          .skip(page * pageSize)
          .limit(pageSize);
      } else {
        contracts = await Contract.find(query, projection)
          .skip(page * pageSize)
          .limit(pageSize);
      }
  
      const totalContracts = await Contract.countDocuments(query);
  
      res.json({
        data: contracts,
        page: page,
        total: totalContracts
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  exports.qtéRows = async (req, res) => {
    const { page, pageSize } = req.body.paginationModel;
    const { sortModel } = req.body.sortOptions;
    
    try {
      const query = {
        $and: [
          { reservedBy: { $exists: true } } // Exclude reserved contracts
        ]
      };
      const projection = {
        contratRef: 1,
        clientRef: 1,
        Civility: 1,
        reservedBy:1,
        Prénom: 1,
        Nom: 1,
        energie: 1,
        Fournisseur: 1,
        date_de_la_signature: 1,
        StatutQté: '$quality.qualification',
        StatutSav: '$sav.qualification',
        Nom_du_partenaire: 1,
        _id: 1,
      };
    
      let contracts;
    
      if (sortModel && sortModel.length > 0) {
        contracts = await Contract.find(query, projection)
          .sort(sortModel.map(({ field, sort }) => [field, sort === 'asc' ? 1 : -1]))
          .skip(page * pageSize)
          .limit(pageSize);
      } else {
        contracts = await Contract.find(query, projection)
          .skip(page * pageSize)
          .limit(pageSize);
      }
    
      const totalContracts = await Contract.countDocuments(query);
    
      res.json({
        data: contracts,
        page: page,
        total: totalContracts
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  
  
  exports.reservation = async (req, res) => {
    try {
      const contract = await Contract.findById(req.params.id);

      
  
      if (!contract) {
        return res.status(404).send({ error: 'Contract not found' });
      }
  
      if (contract.reservedBy) {
        return res.status(403).send({ error: 'Contract already reserved' });
      }
  
      contract.reservedBy = req.body.user;
  
      await contract.save();
  
      return res.send({ message: 'Contract reserved successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ error: 'Server error' });
    }
  }

  // exports.filters = async (req, res) => {
  //   const { serverFilters } = req.body;
  //   const { page, pageSize } = req.query;
  //   console.log(serverFilters.date)
  
  //   try {
  //     const query = {};
  
  //     if (serverFilters.partenaire) {
  //       query.Nom_du_partenaire = serverFilters.partenaire;
  //     }
  
  //     if (serverFilters.qualificationQté) {
  //       query['quality.qualification'] = serverFilters.qualificationQté;
  //     }
  
  //     if (serverFilters.qualificationWc) {
  //       query['wc.qualification'] = serverFilters.qualificationWc;
  //     }
  
  //     if (serverFilters.fournisseur) {
  //       query.Fournisseur = serverFilters.fournisseur;
  //     }
  
  //     if (serverFilters.date && serverFilters.date.length > 0) {
  //       const { startDate, endDate } = serverFilters.date[0];

  //       if (endDate) {
  //       query.date_de_la_signature = {
  //         $gte: new Date(startDate),
  //         $lte: new Date(endDate),
  //       };
  //     }
  //     }
  
  //     const contracts = await Contract.find(query)
  //       .skip(page * pageSize)
  //       .limit(pageSize);
  
  //     const totalContracts = await Contract.countDocuments(query);
  
  //     res.json({
  //       data: contracts,
  //       page: page,
  //       total: totalContracts,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ error: error.message });
  //   }
  // };