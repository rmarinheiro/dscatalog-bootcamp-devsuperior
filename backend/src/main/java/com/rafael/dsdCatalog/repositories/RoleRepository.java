package com.rafael.dsdCatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.rafael.dsdCatalog.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

}
