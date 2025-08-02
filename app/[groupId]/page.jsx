import ClientGroupUI from './ClientGroupUI';

export default async function GroupPage({ params }) {
  const { groupId } = await params;
  return <ClientGroupUI groupId={groupId} />;
}
