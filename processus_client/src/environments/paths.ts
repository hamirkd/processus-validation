export class Paths {
    static base = '';
    static sep = '/';
  
    static login = 'login';
    static permission = Paths.join(Paths.base, 'permission');
    static geolocalisation = Paths.join(Paths.base, 'geolocalisation');
    static configuration = Paths.join(Paths.geolocalisation, 'configuration');
    static sousCouvert = Paths.join(Paths.base, 'sousCouvert');
  
  
    private static paths = {
      'permission': Paths.permission,
      'geolocalisation': Paths.geolocalisation,
      'configuration': Paths.configuration,
      'sousCouverts' : Paths.sousCouvert,
      
    };
  
    static join(path1: string, path2: string): string {
      const sep = Paths.sep;
      if (path1.indexOf(sep) !== 0) {
        path1 = sep + path1;
      }
      return path1 + sep + path2;
    }
  
    static get(name: string, path2: string): string {
      return Paths.join(Paths.paths[name], path2);
    }
  
    static permissionPath(path: string): string {
      return Paths.get('permission', path);
    }
  
    static geolocalisationPath(path: string): string {
      return Paths.get('geolocalisation', path);
    }
  
    static configurationPath(path: string): string {
      return Paths.get('configuration', path);
    }
  }
  