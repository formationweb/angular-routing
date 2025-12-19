import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heavy-simulation',
  standalone: true,
  template: `
    <section>
      <h3>Heavy simulation loaded</h3>
      <p>Traitement simulé terminé.</p>
    </section>
  `
})
export class HeavySimulationComponent implements OnInit {

  ngOnInit(): void {
    const start = performance.now();

    // Simulation d’un traitement CPU coûteux
    let total = 0;
    for (let i = 0; i < 40_000_000; i++) {
      total += i;
    }

    console.log(
      '[HeavySimulation] Temps de calcul :',
      Math.round(performance.now() - start),
      'ms'
    );
  }
}