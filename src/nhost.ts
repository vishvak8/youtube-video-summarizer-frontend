import { NhostClient } from '@nhost/react';

const nhost = new NhostClient({
  subdomain: 'pcpbxvkqnfgbyqbsydgy', // Your Nhost subdomain
  region: 'ap-south-1', // Your Nhost region
});

export default nhost;
