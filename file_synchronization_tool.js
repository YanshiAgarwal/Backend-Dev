const fs = require('fs').promises;
const path = require('path');

async function syncDirectories(sourceDir, BackupDir) {
    try{
        const sourceFiles = await fs.readdir(sourceDir);
        const backupFiles = await fs.readdir(BackupDir);

        for(let file of sourceFiles){
            if(!backupFiles.includes(file)){
                const src = path.join(sourceDir, file);
                const dest = path.join(BackupDir, file);

                await fs.copyFile(src, dest);
                console.log(`Copied: ${file}`);
            }
        }
        console.log("Synchronization complete.");
    }

    catch(err){
        console.error("Error during synchronization:", err.message);
    }
}

syncDirectories(
        path.join(__dirname, 'sourcefolder'),
        path.join(__dirname, 'backupfolder')
);

