import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioModel } from 'src/app/modelos/servicio.model';
import { ServicioService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2'
import { RutaService } from 'src/app/servicios/ruta.service';
import { RutaModel } from 'src/app/modelos/ruta.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private servicioService: ServicioService,
    private rutaService: RutaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
    hora_inicio: ['', [Validators.required]],
    hora_fin: ['', [Validators.required]],
    placa_del_vehiculo: ['', [Validators.required]],
    nombre_conductor: ['', [Validators.required]],
    dinero_recogido: ['', [Validators.required]],
    ruta: ['', [Validators.required]],
  });

  getWithId(id: string) {
    this.servicioService.getWithId(id).subscribe((data: ServicioModel) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["fecha"].setValue(data.fecha as string)
      this.fgValidacion.controls["hora_inicio"].setValue(data.hora_inicio as string)
      this.fgValidacion.controls["hora_fin"].setValue(data.hora_fin as string)
      this.fgValidacion.controls["placa_del_vehiculo"].setValue(data.placa_del_vehiculo as string)
      this.fgValidacion.controls["nombre_conductor"].setValue(data.nombre_conductor as string)
      this.fgValidacion.controls["dinero_recogido"].setValue(data.dinero_recogido as string)
      this.fgValidacion.controls["ruta"].setValue(data.ruta as string)
    })
  }
  edit() {
    let servicio = new ServicioModel();
    servicio.id = this.fgValidacion.controls["id"].value as string;
    servicio.fecha = this.fgValidacion.controls["fecha"].value as string;
    servicio.hora_inicio = this.fgValidacion.controls["hora_inicio"].value as string;
    servicio.hora_fin = this.fgValidacion.controls["hora_fin"].value as string;
    servicio.placa_del_vehiculo = this.fgValidacion.controls["placa_del_vehiculo"].value as string;
    servicio.nombre_conductor = this.fgValidacion.controls["nombre_conductor"].value as string;
    servicio.dinero_recogido = this.fgValidacion.controls["dinero_recogido"].value as string;
    servicio.ruta = this.fgValidacion.controls["ruta"].value as string;

    this.servicioService.update(servicio).subscribe((data: ServicioModel) => {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/servicios/get']);
    },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
  }

  listadoRutas: RutaModel[] = []

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"]
    this.getWithId(id)
    this.getRutas()
  }

  getRutas() {
    this.rutaService.getAll().subscribe((data: RutaModel[]) => {
      this.listadoRutas = data
      console.log(data)
    })
  }

}
