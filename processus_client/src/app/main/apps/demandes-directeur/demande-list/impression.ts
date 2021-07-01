
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { AIRTEL_HEADER } from 'environments/logo';
declare var jsPDF: any;

/**
 * Exemplaire de génération de demande par type de demande
 * @param demande 
 */

 export function generationDemandeExemple(demande){
    let doc = new jspdf('p', 'mm', 'a4', true); // A4 size page of PDF 
    doc.setFontSize(19);
    // doc.rect(15, 21, 180, 15);  // la marge de header du document 
    // doc.setTextColor(255, 0, 0);
    doc.rect(10, 62, 190, 15);
    doc.rect(10, 85, 100, 45); // pour champ a gauche
    doc.rect(110, 85, 90, 45); // pour le champ a droite Requestor
    doc.rect(10, 120, 100, 45); // pour champ a gauche Approved by
    doc.rect(110, 120, 90, 45); // pour le champ a droite Approved by
    doc.rect(10, 165, 100, 45); // champ manager 2
    doc.rect(110, 165, 90, 45); // Champ manager signature
    doc.rect(10, 210, 100, 45); // pour champ directeur manager 2 droie
    doc.rect(110, 210, 90, 45);  // champ directeur manager 2 signature


    doc.addImage(AIRTEL_HEADER, 'JPEG', 15, 11, 35, 35,);
    // doc.rect(15, 21, 100, 189);
    doc.text(82, 17, `CELTEL - NIGER`, + 0, 300);
    doc.text(82, 26, `DIRECTION :`, + 0, 300);
    doc.text(82, 32, `JOB REQUEST :`, + 0, 300);
    doc.text(15, 53, `Project`, doc.setFontSize(12));
    doc.text(15, 59, `Tasks Description`, doc.setFontSize(12));
    doc.text(160, 59, `Date :`, doc.setFontSize(12));
    doc.text(15, 127, `Approved by`, doc.setFontSize(17));
    doc.text(15, 95, `Products Manager :`, doc.setFontSize(14));
    doc.text(15, 137, `IT Director :`, doc.setFontSize(14));
    doc.setFontSize(10);

    let index = 0;
    doc.text(15, 60 + (10 * (index + 1)), demande.description, doc.setFontSize(12));
    doc.text(174, 50 + (10 * (index + 1)), demande.createdAt, doc.setFontSize(12));
    doc.text(15, 100 + (10 * (index + 1)), demande.demandeur.nom + " " + demande.demandeur.prenom, doc.setFontSize(14));
    doc.text(120, 100 + (10 * (index + 1)), demande.createdAt, doc.setFontSize(14));
    doc.text(15, 140 + (10 * (index + 1)), demande.directeur.nom + " " + demande.directeur.prenom, doc.setFontSize(14));
    doc.text(120, 87 + (10 * (index + 1)), demande.etatmanager, doc.setFontSize(14));
    doc.text(120, 128 + (10 * (index + 1)), demande.etatdirecteur, doc.setFontSize(14));
    // doc.text(120, 140 + (10 * (index + 1)), demande.createdAt, doc.setFontSize(14));
    // doc.text(15, 163 + (10 * (index + 1)), demande.typeDemande.workFlowDirection.nom, doc.setFontSize(14));

    doc.save(`Demande.pdf`);
    // this.busys['generatePDFSynthese'] = false;
}
/**
 * impression de JOB REQUEST
 * @param demande 
 */

 export function generationDemandeJobRequest(demande){
    let doc = new jspdf('p', 'mm', 'a4', true); // A4 size page of PDF 
    doc.setFontSize(19);
    // doc.rect(15, 21, 180, 15);  // la marge de header du document 
    // doc.setTextColor(255, 0, 0);
    doc.rect(10, 62, 190, 15);
    doc.rect(10, 85, 100, 45); // pour champ a gauche
    doc.rect(110, 85, 90, 45); // pour le champ a droite Requestor
    doc.rect(10, 120, 100, 45); // pour champ a gauche Approved by
    doc.rect(110, 120, 90, 45); // pour le champ a droite Approved by
    doc.rect(10, 165, 100, 45); // champ manager 2
    doc.rect(110, 165, 90, 45); // Champ manager signature
    doc.rect(10, 210, 100, 45); // pour champ directeur manager 2 droie
    doc.rect(110, 210, 90, 45);  // champ directeur manager 2 signature


    doc.addImage(AIRTEL_HEADER, 'JPEG', 15, 11, 35, 35,);
    // doc.rect(15, 21, 100, 189);
    doc.text(82, 17, `CELTEL - NIGER`, + 0, 300);
    doc.text(82, 26, `DIRECTION :`, + 0, 300);
    doc.text(82, 32, `JOB REQUEST :`, + 0, 300);
    doc.text(15, 53, `Project`, doc.setFontSize(12));
    doc.text(15, 59, `Tasks Description`, doc.setFontSize(12));
    doc.text(160, 59, `Date :`, doc.setFontSize(12));
    doc.text(15, 127, `Approved by`, doc.setFontSize(17));
    doc.text(15, 95, `Products Manager :`, doc.setFontSize(14));
    doc.text(15, 137, `IT Director :`, doc.setFontSize(14));
    doc.setFontSize(10);

    let index = 0;
    doc.text(15, 60 + (10 * (index + 1)), demande.description, doc.setFontSize(12));
    doc.text(174, 50 + (10 * (index + 1)), demande.createdAt, doc.setFontSize(12));
    doc.text(15, 100 + (10 * (index + 1)), demande.demandeur.nom + " " + demande.demandeur.prenom, doc.setFontSize(14));
    doc.text(120, 100 + (10 * (index + 1)), demande.createdAt, doc.setFontSize(14));
    doc.text(15, 140 + (10 * (index + 1)), demande.directeur.nom + " " + demande.directeur.prenom, doc.setFontSize(14));
    doc.text(120, 87 + (10 * (index + 1)), demande.etatmanager, doc.setFontSize(14));
    doc.text(120, 128 + (10 * (index + 1)), demande.etatdirecteur, doc.setFontSize(14));
    // doc.text(120, 140 + (10 * (index + 1)), demande.createdAt, doc.setFontSize(14));
    // doc.text(15, 163 + (10 * (index + 1)), demande.typeDemande.workFlowDirection.nom, doc.setFontSize(14));

    doc.save(`Demande.pdf`);
    // this.busys['generatePDFSynthese'] = false;
}
export function generationDemandeAPN(demande){
        let doc = new jspdf('p', 'mm', 'a4', true); // A4 size page of PDF 
        doc.setFontSize(19);
        // doc.rect(15, 21, 180, 15);  // la marge de header du document 
        // doc.setTextColor(255, 0, 0);
        doc.rect(10, 62, 190, 15);
        doc.rect(10, 85, 100, 45); // pour champ a gauche
        doc.rect(110, 85, 90, 45); // pour le champ a droite Requestor
        doc.rect(10, 120, 100, 45); // pour champ a gauche Approved by
        doc.rect(110, 120, 90, 45); // pour le champ a droite Approved by
        doc.rect(10, 165, 100, 45); // champ manager 2
        doc.rect(110, 165, 90, 45); // Champ manager signature
        doc.rect(10, 210, 100, 45); // pour champ directeur manager 2 droie
        doc.rect(110, 210, 90, 45);  // champ directeur manager 2 signature


        doc.addImage(AIRTEL_HEADER, 'JPEG', 15, 11, 35, 35,);
        // doc.rect(15, 21, 100, 189);
        doc.text(82, 17, `CELTEL - NIGER`, + 0, 300);
        doc.text(82, 26, `DIRECTION :`, + 0, 300);
        doc.text(82, 32, `APN :`, + 0, 300);
        doc.text(15, 53, `Project`, doc.setFontSize(12));
        doc.text(15, 59, `Tasks Description`, doc.setFontSize(12));
        doc.text(160, 59, `Date :`, doc.setFontSize(12));
        doc.text(15, 127, `Approved by`, doc.setFontSize(17));
        doc.text(15, 95, `Products Manager :`, doc.setFontSize(14));
        doc.text(15, 137, `IT Director :`, doc.setFontSize(14));
        doc.setFontSize(10);

        let index = 0;
        doc.text(15, 60 + (10 * (index + 1)), demande.description, doc.setFontSize(12));
        doc.text(174, 50 + (10 * (index + 1)), demande.createdAt, doc.setFontSize(12));
        doc.text(15, 100 + (10 * (index + 1)), demande.demandeur.nom + " " + demande.demandeur.prenom, doc.setFontSize(14));
        doc.text(120, 100 + (10 * (index + 1)), demande.createdAt, doc.setFontSize(14));
        doc.text(15, 140 + (10 * (index + 1)), demande.directeur.nom + " " + demande.directeur.prenom, doc.setFontSize(14));
        doc.text(120, 87 + (10 * (index + 1)), demande.etatmanager, doc.setFontSize(14));
        doc.text(120, 128 + (10 * (index + 1)), demande.etatdirecteur, doc.setFontSize(14));
        // doc.text(120, 140 + (10 * (index + 1)), demande.createdAt, doc.setFontSize(14));
        // doc.text(15, 163 + (10 * (index + 1)), demande.typeDemande.workFlowDirection.nom, doc.setFontSize(14));

        doc.save(`Demande.pdf`);
        // this.busys['generatePDFSynthese'] = false;
    }