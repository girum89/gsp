export interface OrganelleNode {
    name: string;
    children?: OrganelleNode[];
    accession?:string;
    type?: string;
}