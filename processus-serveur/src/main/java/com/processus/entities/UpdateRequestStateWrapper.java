
//+++++++++++++++++++++++++++++ Mahamadou Alio / mahamadoualio05@gmail.com  ++++++++++++++++++++++++++++++++++++++++++++


package com.processus.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import java.io.Serializable;
import java.util.Optional;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateRequestStateWrapper implements Serializable {

    private Long requestId;
    private String isApproved;

    public long getRequestId() {
        return Optional.ofNullable(requestId).orElse(0L);
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public boolean isApproved() {
        return Optional.ofNullable(isApproved).map(s -> s.equals("ACCEPTER")).orElse(false);
    }

    public void setApproved(String approved) {
        isApproved = approved;
    }

    public String getApproved() {
        return isApproved;
    }
}
