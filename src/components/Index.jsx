import React, { Component } from 'react';
import './Index.css';

//Form
import Form from './Form/Form';
import Tarefas from './Tarefas/Tarefas';

export default class Index extends Component {
  state = {
    novaTarefa: '',
    tarefas: [],
    index: -1,
  };

  componentDidMount() {
    if (!localStorage.getItem('tarefas')) return;
    this.setState({
      tarefas: JSON.parse(localStorage.getItem('tarefas')),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;
    if (tarefas === prevState.tarefas) return;
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas, index } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();

    if (tarefas.indexOf(novaTarefa) !== -1 || novaTarefa.length <= 3 || novaTarefa.length >= 40 || /[^a-zA-Z0-9À-ú ]/g.test(novaTarefa)) {
      return;
    }

    const novasTarefas = [...tarefas];

    if (index === -1) {
      this.setState({
        tarefas: [...novasTarefas, novaTarefa],
        novaTarefa: '',
      });
    } else {
      novasTarefas[index] = novaTarefa;
      this.setState({
        tarefas: [...novasTarefas],
        novaTarefa: '',
        index: -1,
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  };

  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    const novoArr = tarefas.filter((a) => a !== tarefas[index]);
    this.setState({
      tarefas: [...novoArr],
    });
  };

  handleEdit = (e, index) => {
    const { tarefas } = this.state;
    this.setState({
      index: index,
      novaTarefa: tarefas[index],
    });
  };

  render() {
    const { novaTarefa, tarefas } = this.state;
    return (
      <div className="index">
        <h1>Lista de Tarefas</h1>
        <Form handleChange={this.handleChange} handleSubmit={this.handleSubmit} novaTarefa={novaTarefa} />
        <Tarefas tarefas={tarefas} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
      </div>
    );
  }
}
