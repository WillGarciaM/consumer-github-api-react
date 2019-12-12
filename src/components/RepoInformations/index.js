import React from 'react';
import './index.css';

const RepoInformations = (props) => {
  return (
    <div>
      <div className="top-container">
        <h1 className="titulo">Principais</h1>
        <h1>Quantidade de Estrelas: {props.stars}</h1>
        <h1>Quantidade de Forks: {props.forks}</h1>
        <h1>Quantidade de Issues: {props.issues}</h1>
        <h1>Última Atualização: {props.lastCommit}</h1>
      </div>
      {
        (props.license === null)
          ?
          <h1>Licença: Não informado</h1>
          :
          <div className="bottom-container">
            <h1 className="titulo">Licença</h1>
            <h1>Chave: {props.license.key}</h1>
            <h1>Nome: {props.license.name}</h1>
            <h1>SPDX ID: {props.license.spdx_id}</h1>
            {
              (props.license.url === null)
                ?
                <h1>URL: Não informado</h1>
                :
                <h1>URL: {props.license.url}</h1>
            }
            <h1>Node ID: {props.license.node_id}</h1>
          </div>
      }
    </div>
  );
};

export default RepoInformations;
