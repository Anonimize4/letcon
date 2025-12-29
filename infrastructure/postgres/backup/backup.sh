#!/bin/bash

# Automated PostgreSQL backup script
# This script creates a backup of the cybersecurity_training database

BACKUP_DIR="/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.sql"

echo "Starting backup at $(date)"
pg_dump -h postgres -U postgres -d cybersecurity_training > "$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo "Backup completed successfully: $BACKUP_FILE"
    # Optional: Compress the backup
    gzip "$BACKUP_FILE"
    echo "Backup compressed: $BACKUP_FILE.gz"
else
    echo "Backup failed"
    exit 1
fi

# Optional: Clean up old backups (keep last 7 days)
find "$BACKUP_DIR" -name "backup_*.sql.gz" -mtime +7 -delete