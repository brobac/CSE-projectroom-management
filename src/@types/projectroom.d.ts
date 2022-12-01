declare module "@types" {
  type ProjectRoom = {
    projectRoomId: number;
    roomName: string;
    priority: number;
    projectTableList: ProjectTable[];
  };

  type ProjectTable = {
    tableId: number;
    tableName: string;
  };
}
