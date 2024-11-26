import { Address as Addr, Avatar, Badge, Identity, Name } from "@coinbase/onchainkit/identity";

export const OnchainKitIdentity = () => {
  return (
    <Identity
      address="0x4ed4e862860bed51a9570b96d89af5e1b0efefed"
      schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
    >
      <Avatar />
      <Name>
        <Badge />
      </Name>
      <Addr />
    </Identity>
  );
};
