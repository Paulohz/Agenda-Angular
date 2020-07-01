import { Component, OnInit } from '@angular/core';
import { Contato } from './contato';
import { ContatoService } from '../contato.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario: FormGroup;
  contatos: Contato[] = [];
  colunas: string[] = ["id", "nome", "email", "favorito"]

  constructor(
    private service: ContatoService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.montarFormulario();

    this.listarContatos();
  }

  montarFormulario() {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  listarContatos() {
    this.service.list()
      .subscribe(data => {
        this.contatos = data;
      });
  }

  favoritar(contato: Contato){
    this.service.favorite(contato).subscribe(data => {
      contato.favorito = !contato.favorito;   
    })
  }

  submit() {
    const formValues = this.formulario.value;

    const contato: Contato = new Contato(formValues.nome, formValues.email);

    this.service.save(contato).subscribe(data => {
      let lista: Contato[] = [...this.contatos, data];
      this.contatos = lista
    });
  }

}
