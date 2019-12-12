import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
import githubLogo from './images/github-logo.png';
import RepoInformations from './components/RepoInformations';

export default class App extends Component {

  state = {
    repoInformations: {
      stars: null,
      forks: null,
      issues: null,
      lastCommit: null,
      license: {
        key: null,
        name: null,
        spdx_id: null,
        url: null,
        node_id: null
      }
    },

    seachRepoError: null,
    repoLoaded: false,

    serchUserInput: '',
    serchRepositoryInput: ''
  };

  handleChangeSearchUserIpunt = (event) => {
    this.setState({ serchUserInput: event.target.value });
  };

  handleChangeSearchRepositoryInput = (event) => {
    this.setState({ serchRepositoryInput: event.target.value });
  };

  serchButtonPressed = () => {
    this.request();
  };

  request = async () => {
    const { serchUserInput, serchRepositoryInput } = this.state;

    if (serchUserInput === '' || serchUserInput === undefined) {
      this.setState({
        seachRepoError: 'Preencha o campo de Usuário',
        repoLoaded: false
      });
      return;
    }
    if (serchRepositoryInput === '' || serchRepositoryInput === undefined) {
      this.setState({
        seachRepoError: 'Preencha o campo de Repositório',
        repoLoaded: false
      });
      return;
    }

    await axios.get(`https://api.github.com/repos/${serchUserInput}/${serchRepositoryInput}`)
      .then(response => {
        this.setState({
          repoInformations: {
            stars: response.data.stargazers_count,
            forks: response.data.forks_count,
            issues: response.data.open_issues_count,
            lastCommit: (new Date(response.data.updated_at).toLocaleString()), //toLocaleTimeString()),

            license: ((response.data.license === null
              ?
              null
              :
              {
                key: response.data.license.key,
                name: response.data.license.name,
                spdx_id: response.data.license.spdx_id,
                url: response.data.license.url,
                node_id: response.data.license.node_id
              }
            ))
          },
          repoLoaded: true
        });
      })
      .catch((error) => {
        this.setState({ repoLoaded: false });

        if (error.toString() === "Error: Request failed with status code 404") {
          this.setState({ seachRepoError: 'Usuário ou Repositório não encontrado' });
        }
      })
  };

  render() {
    const { stars, forks, issues, lastCommit, license } = this.state.repoInformations;
    return (
      <div className="App">
        <img src={githubLogo} alt="github-logo" className="logo" />
        <h1>Busque um repositório GitHub</h1>
        <div className="formContainer">
          <input
            type="text"
            className="serchUserInput"
            value={this.state.serchUserInput}
            onChange={this.handleChangeSearchUserIpunt}
            placeholder="Usuário"
          />
          <br />
          <input
            type="text"
            className="serchRepositoryInput"
            value={this.state.serchRepositoryInput}
            onChange={this.handleChangeSearchRepositoryInput}
            placeholder="Repositório"
          />
          <br />
          <button className="serchButton" onClick={this.serchButtonPressed}>Buscar</button>
        </div>
        {(this.state.repoLoaded)
          ?
          <RepoInformations
            stars={stars}
            forks={forks}
            issues={issues}
            lastCommit={lastCommit}
            license={license}
          />
          :
          <h1>{this.state.seachRepoError}</h1>
        }
      </div>
    );
  }
}
