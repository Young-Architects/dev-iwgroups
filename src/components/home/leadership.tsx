import React from "react";

interface Leader {
  profile_image: string;
  leader_name: string;
  leader_designation: string;
  leader_bio: string;
  leader_email: string;
}

interface LeadershipProps {
  leader_ship_team?: Leader[];
  leader_ship_description?: string;
}

function Leadership({
  leader_ship_team = [],
  leader_ship_description = "",
}: LeadershipProps) {
  return (
    <div className="lead_section_wrapper">
      <h2>Our Leadership Team</h2>

      <p>{leader_ship_description}</p>

      <div>
        {leader_ship_team.map((leader, index) => (
          <div key={index}>
            <img
              src={leader.profile_image}
              alt={leader.leader_name}
            />

            <h3>{leader.leader_name}</h3>
            <p>{leader.leader_designation}</p>
            <p>{leader.leader_bio}</p>
            <p>{leader.leader_email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leadership;