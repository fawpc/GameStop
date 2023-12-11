const db = require('../dbConnect');

async function editUser(req, res) {
  const idU = req.headers['idu'];
  const { nome, senha, datanasc, fk_perfil, fk_game, fk_focus } = req.body;

  const updateFields = {};

  if (nome !== undefined) {
    updateFields.nome = nome;
  }
  if (senha !== undefined) {
    updateFields.senha = senha;
  }
  if (datanasc !== undefined) {
    updateFields.datanasc = datanasc;
  }
  if (fk_perfil !== undefined) {
    updateFields.fk_perfil = fk_perfil;
  }
  if (fk_game !== undefined) {
    updateFields.fk_game = fk_game;
  }
  if (fk_focus !== undefined) {
    updateFields.fk_focus = fk_focus;
  }


  try {
    const fieldsToUpdate = Object.keys(updateFields);
    const fieldValues = fieldsToUpdate.map((field) => updateFields[field]);

    if (fieldsToUpdate.length === 0) {
      return res.status(400).send('Nenhum campo para atualização foi fornecido.');
    }

    const updateQuery = `UPDATE usuario SET (${fieldsToUpdate.join(', ')}) = (${fieldValues.map((_, i) => `$${i + 1}`).join(', ')}) WHERE idu = $${fieldsToUpdate.length + 1}`;
    await db.one(updateQuery, [...fieldValues, idU]);

    res.status(201).send('Usuário atualizado com sucesso.');
  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error);
    res.status(500).send('Ocorreu um erro ao atualizar o usuário.');
  }
}

module.exports = {
  editUser
};