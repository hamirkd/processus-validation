
//+++++++++++++++++++++++++++++ Mahamadou Alio / mahamadoualio05@gmail.com  ++++++++++++++++++++++++++++++++++++++++++++

package com.processus.repository;


import com.processus.entities.Departement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartementRepository extends JpaRepository<Departement, Long> {

    List<Departement> findByDirectionId(Long id);
}
