<?php
session_name("admin");
session_start();

include '../../config/data_connect.php';

$sql = "SELECT * FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0): ?>
    <table id="userTable">
        <thead>
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th class="hide1">Password</th>
                <th class="hide2">Address</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php while($row = $result->fetch_assoc()):
                $user_id = (int)$row['user_id'];
                $statusText = ($row['status'] === 'locked') ? 'Locked' : 'Active';
                $toggleAction = ($row['status'] === 'locked') ? 'Unlock' : 'Lock';
            ?>
                <tr id="<?php echo $user_id; ?>">
                    <td><?php echo ltrim($row['user_id'], "0"); ?></td>
                    <td><?php echo htmlspecialchars($row['user_name']); ?></td>
                    <td><?php echo htmlspecialchars($row['email']); ?></td>
                    <td><?php echo htmlspecialchars($row['phone']); ?></td>
                    <td class="hide1"><?php echo htmlspecialchars($row['password']); ?></td>
                    <td class="hide2">
                        <?php echo htmlspecialchars($row['street'] . ', ' . $row['ward'] . ', ' . $row['district'] . ', ' . $row['city']); ?>
                    </td>
                    <td><?php echo htmlspecialchars($row['role']); ?></td>

                    <td>
                        <button class="button lock" onclick="toggleLockUser(<?php echo $user_id; ?>, '<?php echo $row['status']; ?>')">
                            <?php echo $toggleAction; ?>
                        </button>
                        <button class="button edit" onclick="editUser('<?php echo $user_id; ?>')">
                            <ion-icon name="create-outline"></ion-icon>
                        </button>
                    </td>
                </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
<?php else: ?>
    <p>No users found.</p>
<?php endif; ?>
